import { personalFlowerSamples } from "@/lib/sourcing/personal-flowers";

export default function SourcingLibraryPage() {
  return (
    <main className="admin-page">
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">Private product research</p>
          <h1>Sourcing library</h1>
          <p>Each public sample is tied to one exact marketplace listing and variant. Seller photos stay private until permission is granted.</p>
        </div>
        <a className="admin-button admin-button--outline" href="/personal-flowers" target="_blank" rel="noreferrer">
          View public page <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="admin-source-list" aria-label="Personal flower source records">
        {personalFlowerSamples.map((sample) => (
          <article className="admin-source-card" key={sample.slug}>
            <div className="admin-source-heading">
              <img src={sample.image} alt="" />
              <div>
                <p className="admin-kicker">Personal flowers · {sample.number}</p>
                <h2>{sample.name}</h2>
                <span className="admin-source-market">{sample.sourcing.marketplace} · {sample.sourcing.listingId}</span>
              </div>
            </div>
            <dl className="admin-source-details">
              <div><dt>Exact listing</dt><dd>{sample.sourcing.listingTitle}</dd></div>
              <div><dt>Selected variant</dt><dd>{sample.sourcing.exactVariant}</dd></div>
              <div><dt>Supplier</dt><dd>{sample.sourcing.supplier}</dd></div>
              <div><dt>Displayed source price</dt><dd>{sample.sourcing.sourcePrice}</dd></div>
              <div><dt>MOQ</dt><dd>{sample.sourcing.moq}</dd></div>
              <div><dt>Permission</dt><dd>{sample.sourcing.permissionStatus}</dd></div>
              <div><dt>Evidence</dt><dd>{sample.sourcing.evidence}</dd></div>
              <div><dt>Checked</dt><dd>{sample.sourcing.checkedOn}</dd></div>
            </dl>
            <div className="admin-source-actions">
              <a className="admin-button admin-button--small" href={sample.sourcing.originalUrl} target="_blank" rel="noreferrer">
                Open original listing <span aria-hidden="true">↗</span>
              </a>
              <a className="admin-text-link" href={sample.sourcing.researchUrl} target="_blank" rel="noreferrer">
                Open research mirror ↗
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
