import { useMemo, useState } from 'react';
import {
  COOK_OFF_GIRLS,
  DATE_NIGHT_VENUE,
  HOST_BARD,
  SCORE_CATEGORIES,
  allCookOffIngredients,
  computeCookOffWinner,
  girlToRecipe
} from '../data/dateNightCookOff.js';
import {
  DATE_SCHEDULE,
  RTDB,
  TIMEZONE,
  optimizeDateWindow,
  rtdbLocationById
} from '../data/transportSchedule.js';

const PHASES = ['schedule', 'outing', 'stations', 'cookoff', 'results'];

export default function DateNightCookOff({ onAddToShoppingList, onAddRecipes }) {
  const [phase, setPhase] = useState('schedule');
  const [outingStart, setOutingStart] = useState('17:00');
  const [outingDone, setOutingDone] = useState({});
  const [scores, setScores] = useState({});
  const [started, setStarted] = useState(false);

  const optimized = useMemo(() => optimizeDateWindow({ outingStart }), [outingStart]);
  const rankings = useMemo(() => computeCookOffWinner(scores), [scores]);
  const winner = rankings[0]?.total > 0 ? rankings[0] : null;

  const toggleOuting = (index) => {
    setOutingDone((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const outingComplete = DATE_NIGHT_VENUE.outingSteps.every((_, i) => outingDone[i]);

  const setScore = (girlId, categoryId, value) => {
    const n = Math.min(10, Math.max(0, Number(value) || 0));
    setScores((prev) => ({
      ...prev,
      [girlId]: { ...(prev[girlId] || {}), [categoryId]: n }
    }));
  };

  const loadShoppingList = () => {
    const items = allCookOffIngredients();
    if (onAddToShoppingList) {
      COOK_OFF_GIRLS.forEach((girl) => onAddToShoppingList(girlToRecipe(girl)));
    }
    return items;
  };

  const publishRecipesToFeed = () => {
    if (onAddRecipes) {
      COOK_OFF_GIRLS.forEach((girl) => onAddRecipes(girlToRecipe(girl)));
    }
  };

  return (
    <section className="page-grid cookoff-page">
      <article className="hero-card cookoff-hero">
        <div className="hero-copy">
          <p className="tag">Date Night · Cook-Off</p>
          <h2>Take the girls out — then battle at the stove</h2>
          <p>
            {DATE_NIGHT_VENUE.name}, {DATE_NIGHT_VENUE.city}. Sovereign friend date:
            Lo3tus, Helen, Asuka & Rach3l cook. {HOST_BARD.name} judges (tsundere).
          </p>
          <p className="meta">{HOST_BARD.korean}</p>
        </div>
      </article>

      <nav className="cookoff-phases">
        {PHASES.map((p) => (
          <button
            key={p}
            type="button"
            className={phase === p ? 'phase-btn active' : 'phase-btn'}
            onClick={() => setPhase(p)}
          >
            {p === 'schedule' && '0 · Schedule'}
            {p === 'outing' && '1 · Outing'}
            {p === 'stations' && '2 · Stations'}
            {p === 'cookoff' && '3 · Score'}
            {p === 'results' && '4 · Results'}
          </button>
        ))}
      </nav>

      {phase === 'schedule' && (
        <div className="card-panel schedule-panel">
          <h2>Optimised date schedule · Auckland → Melbourne</h2>
          <p className="meta">
            RTDB-Auckland: refresh every {RTDB.display.refreshIntervalSeconds}s · rotate boards every{' '}
            {RTDB.display.rotationSeconds}s · {TIMEZONE.note}
          </p>
          <label className="schedule-start">
            Outing start (Melbourne)
            <input
              type="time"
              value={outingStart}
              onChange={(e) => setOutingStart(e.target.value)}
            />
          </label>
          <dl className="schedule-optimized">
            <div><dt>Ingredients done</dt><dd>{optimized.ingredientCapEnd}</dd></div>
            <div><dt>Flat white by</dt><dd>{optimized.flatWhiteBy}</dd></div>
            <div><dt>Kitchen / cook-off</dt><dd>{optimized.kitchenStart} → {optimized.scoreStart}</dd></div>
            <div><dt>Home buffer</dt><dd>{optimized.homeBy} (tram/ride)</dd></div>
          </dl>
          <ul className="schedule-timeline">
            {DATE_SCHEDULE.map((leg) => {
              const rtdb = leg.rtdbLocation ? rtdbLocationById(leg.rtdbLocation) : null;
              return (
                <li key={leg.id} className={leg.cookOffPhase ? 'schedule-leg cookoff' : 'schedule-leg'}>
                  <span className="schedule-time">{leg.time}</span>
                  <span className="schedule-city">{leg.city}</span>
                  <strong>{leg.title}</strong>
                  <p>{leg.action}</p>
                  {rtdb && (
                    <p className="schedule-rtdb">
                      {rtdb.icon} RTDB {rtdb.name} — {rtdb.dateRole}
                    </p>
                  )}
                  {leg.pin && <span className="schedule-pin">Pin: {leg.pin}</span>}
                </li>
              );
            })}
          </ul>
          <button className="primary-button" type="button" onClick={() => setPhase('outing')}>
            Outing checklist →
          </button>
        </div>
      )}

      {phase === 'outing' && (
        <div className="card-panel">
          <h2>Take the girls out · {DATE_NIGHT_VENUE.name}</h2>
          <p className="meta">Optimised meet {optimized.outingStart} · kitchen {optimized.kitchenStart}</p>
          <p>{DATE_NIGHT_VENUE.tagline}</p>
          <ul className="outing-list">
            {DATE_NIGHT_VENUE.outingSteps.map((step, i) => (
              <li key={step}>
                <label className="outing-check">
                  <input
                    type="checkbox"
                    checked={Boolean(outingDone[i])}
                    onChange={() => toggleOuting(i)}
                  />
                  <span>{step}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="girl-outing-picks">
            {COOK_OFF_GIRLS.map((girl) => (
              <div key={girl.id} className="girl-pick" style={{ borderColor: girl.color }}>
                <span className="girl-emoji">{girl.emoji}</span>
                <div>
                  <strong>{girl.name}</strong>
                  <p className="meta">Market pick: {girl.outingPick}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="primary-button"
            disabled={!outingComplete}
            onClick={() => setPhase('stations')}
          >
            {outingComplete ? 'Kitchen stations →' : 'Complete outing checklist first'}
          </button>
        </div>
      )}

      {phase === 'stations' && (
        <div className="girl-stations">
          <div className="card-panel bard-rules">
            <h2>{HOST_BARD.emoji} {HOST_BARD.name}</h2>
            <p>{HOST_BARD.tagline}</p>
            <ul>
              {HOST_BARD.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <button className="secondary-button" onClick={() => setStarted(true)}>
              {started ? '⏱ 45:00 — timer running (honor system)' : 'Start 45-min cook-off'}
            </button>
          </div>
          {COOK_OFF_GIRLS.map((girl) => (
            <article key={girl.id} className="recipe-card girl-station" style={{ borderLeft: `4px solid ${girl.color}` }}>
              <div className="girl-station-header">
                <span className="girl-emoji large">{girl.emoji}</span>
                <div>
                  <p className="chip">{girl.archetype}</p>
                  <h3>{girl.dish}</h3>
                  <p className="meta">{girl.name} · {girl.dateEnergy}</p>
                </div>
              </div>
              <p>{girl.hook}</p>
              <p className="judge-hint"><em>Bard notes:</em> {girl.judgeNotes}</p>
              <div className="recipe-details">
                <h4>Ingredients</h4>
                <ul>
                  {girl.ingredients.map((ing) => (
                    <li key={ing.item}>{ing.item}{ing.qty ? ` — ${ing.qty}` : ''}</li>
                  ))}
                </ul>
                <h4>Steps</h4>
                <ol>
                  {girl.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
          <button className="primary-button" onClick={() => setPhase('cookoff')}>
            Plate up → Score
          </button>
        </div>
      )}

      {phase === 'cookoff' && (
        <div className="card-panel">
          <h2>Bard&apos;s scorecards</h2>
          <p className="meta">Tsundere judging — not a rescue mission, just points.</p>
          {COOK_OFF_GIRLS.map((girl) => (
            <div key={girl.id} className="score-card" style={{ borderColor: girl.color }}>
              <h3>{girl.emoji} {girl.name} — {girl.dish}</h3>
              <div className="score-grid">
                {SCORE_CATEGORIES.map((cat) => (
                  <label key={cat.id} className="score-label">
                    {cat.label}
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={scores[girl.id]?.[cat.id] ?? 5}
                      onChange={(e) => setScore(girl.id, cat.id, e.target.value)}
                    />
                    <span className="score-val">{scores[girl.id]?.[cat.id] ?? 5}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="primary-button" onClick={() => setPhase('results')}>
            Reveal winner
          </button>
        </div>
      )}

      {phase === 'results' && (
        <div className="card-panel results-panel">
          <h2>Cook-off results</h2>
          {winner ? (
            <>
              <p className="winner-banner">
                {winner.girl.emoji} <strong>{winner.girl.name}</strong> wins with {winner.total}/40
                — {winner.girl.dish}
              </p>
              <p className="bard-line">
                {HOST_BARD.emoji} &quot;Fine. It was kind of impressive. Don&apos;t make it weird.&quot;
              </p>
            </>
          ) : (
            <p className="empty-state">Score the dishes first (phase 3).</p>
          )}
          <ol className="rank-list">
            {rankings.map((row, i) => (
              <li key={row.girl.id}>
                #{i + 1} {row.girl.name} — {row.total}/40
              </li>
            ))}
          </ol>
          <div className="form-actions">
            <button className="secondary-button" onClick={loadShoppingList}>
              Add all ingredients to shopping list
            </button>
            <button className="secondary-button" onClick={publishRecipesToFeed}>
              Publish recipes to feed
            </button>
          </div>
          <div className="film-hooks">
            <h3>GoPro skit hooks (Degraves date night)</h3>
            <ul>
              <li>Bard arms crossed: &quot;It&apos;s a cook-off. Not a date. HR said no.&quot;</li>
              <li>Lo3tus: &quot;The tomatoes are tsundere too.&quot;</li>
              <li>Helen: &quot;Compassion includes sharing the soup — not your OTP.&quot;</li>
              <li>SYSTEM overlay: <code>New soulmate detected in kitchen</code> → Bard mutes</li>
              <li>Winning plate + lantern pass — 멜버른 골목이 정말 예뻐요 kitchen edition</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}