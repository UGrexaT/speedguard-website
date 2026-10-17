(function () {
  const form = document.querySelector("[data-fine-calc]");
  const result = document.querySelector("[data-calc-result]");

  if (!form || !result) {
    return;
  }

  const COSTS = 5;

  // Victim fine surcharge by fine amount: O. Reg. 161/00, Table.
  const SURCHARGE_BANDS = [
    [50, 10], [75, 15], [100, 20], [150, 25], [200, 35], [250, 50],
    [300, 60], [350, 75], [400, 85], [450, 95], [500, 110], [1000, 125],
  ];

  // Ticket (set fine) per km/h over: Ontario Court of Justice, Schedule 43.
  // Doubled in community safety zones and construction zones with workers present.
  function setRate(over, zone) {
    const rate = over < 20 ? 2.5 : over < 30 ? 3.75 : over < 50 ? 6 : null;
    return rate === null ? null : rate * (zone ? 2 : 1);
  }

  // Fine per km/h over if convicted in court: HTA s.128(14).
  function courtRate(over) {
    return over < 20 ? 3 : over < 30 ? 4.5 : over < 50 ? 7 : 9.75;
  }

  function surcharge(fine) {
    for (const [max, amount] of SURCHARGE_BANDS) {
      if (fine <= max) {
        return amount;
      }
    }
    return fine * 0.25;
  }

  // Demerit points for speeding: O. Reg. 339/94.
  function demerits(over, limit) {
    if (over >= 50 || (limit < 80 && over >= 40)) return 6;
    if (over >= 30) return 4;
    if (over >= 16) return 3;
    return 0;
  }

  // Stunt driving by speed: O. Reg. 455/07.
  function stuntReason(over, limit, speed) {
    if (over >= 50) return "50 km/h or more over the limit counts as stunt driving.";
    if (limit < 80 && over >= 40) return "40 km/h or more over the limit counts as stunt driving where the limit is under 80.";
    if (speed >= 150) return "150 km/h or more counts as stunt driving on any road, including 110 km/h highways.";
    return "";
  }

  function money(amount) {
    const cents = amount % 1 !== 0;
    return "$" + amount.toLocaleString("en-CA", {
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: 2,
    });
  }

  function rate(amount) {
    return "$" + amount.toFixed(2);
  }

  function note(text, tone) {
    return '<li class="calc-note' + (tone ? " is-" + tone : "") + '">' + text + "</li>";
  }

  function render() {
    const limit = Number(form.elements.limit.value);
    const speed = Math.round(Number(form.elements.speed.value));
    const zone = form.elements.zone.checked;
    const novice = form.elements.licence.value === "novice";

    if (!speed || speed < 1 || speed > 400) {
      result.innerHTML =
        '<span class="calc-kicker">Waiting for a speed</span>' +
        '<span class="calc-summary">Enter your speed in km/h to see the ticket total.</span>';
      return;
    }

    const over = speed - limit;

    if (over <= 0) {
      result.innerHTML =
        '<span class="calc-kicker">No speeding fine</span>' +
        '<span class="calc-total">$0</span>' +
        '<span class="calc-summary">' + speed + " km/h is within the posted " + limit + " km/h limit.</span>";
      return;
    }

    const points = demerits(over, limit);
    const stunt = stuntReason(over, limit, speed);

    if (stunt) {
      let notes =
        note("<strong>Why:</strong> " + stunt, "alert") +
        note("<strong>At the roadside:</strong> an immediate 30-day licence suspension and a 14-day vehicle impoundment, even if the car isn’t yours.", "alert") +
        note("<strong>If convicted:</strong> a $2,000–$10,000 fine (or up to 6 months in jail), 6 demerit points and a 1–3-year licence suspension for a first conviction.", "alert");

      if (over >= 50) {
        notes += note("<strong>Speeding charge:</strong> at 50+ over there’s no ticket to pay; it goes to court. If convicted of speeding, the fine is " + rate(9.75) + " per km/h over (" + money(9.75 * over) + " here), before surcharge and costs.");
      }

      result.innerHTML =
        '<span class="calc-kicker">Stunt-driving speed</span>' +
        '<span class="calc-total is-alert">$2,000–10,000</span>' +
        '<span class="calc-summary">' + over + " km/h over (" + speed + " in a " + limit + ") · fine range if convicted of stunt driving</span>" +
        '<ul class="calc-notes">' + notes + "</ul>";
      return;
    }

    const perKm = setRate(over, zone);
    const fine = perKm * over;
    const extra = surcharge(fine);
    const total = fine + extra + COSTS;
    let notes = "";

    if (zone) {
      notes += note("<strong>Zone:</strong> set fines are doubled in community safety zones and in construction zones when workers are present. The court amount isn’t calculated for zones here.", "caution");
    } else {
      notes += note("<strong>If convicted in court:</strong> " + money(courtRate(over) * over) + " fine (" + over + " × " + rate(courtRate(over)) + ", HTA s.128(14)), before surcharge and costs. That’s the court scale, not the ticket.");
    }

    if (points === 0) {
      notes += note(
        "<strong>Points:</strong> none for 1–15 over. It’s still a speeding conviction, and insurers price convictions, not points." +
        (over === 15 ? " One more km/h (16 over) adds 3 points." : "")
      );
    } else {
      notes += note("<strong>Points:</strong> " + points + " demerit points, on your record for 2 years from the offence date.", "caution");
    }

    if (novice && over >= 30) {
      notes += note("<strong>New drivers:</strong> a conviction for 30+ over means at least a 30-day licence suspension.", "alert");
    } else if (novice && points > 0) {
      notes += note("<strong>New drivers:</strong> " + points + " points is in the warning-letter range (2–5). A 60-day suspension comes at 9 points.", "caution");
    }

    notes += note("<strong>Insurance:</strong> brokers estimate one ticket adds roughly 10–25% to premiums, usually for about 3 years. That’s an estimate, not a rate.");

    result.innerHTML =
      '<span class="calc-kicker">Total on the ticket</span>' +
      '<span class="calc-total">' + money(total) + "</span>" +
      '<span class="calc-summary">' + over + " km/h over · " + points + " demerit point" + (points === 1 ? "" : "s") + "</span>" +
      '<dl class="calc-breakdown">' +
      "<div><dt>Set fine (" + over + " × " + rate(perKm) + ")</dt><dd>" + money(fine) + "</dd></div>" +
      "<div><dt>Victim fine surcharge</dt><dd>" + money(extra) + "</dd></div>" +
      "<div><dt>Costs</dt><dd>" + money(COSTS) + "</dd></div>" +
      '<div class="is-total"><dt>Total on the ticket</dt><dd>' + money(total) + "</dd></div>" +
      "</dl>" +
      '<ul class="calc-notes">' + notes + "</ul>";
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    render();
  });

  render();
})();
