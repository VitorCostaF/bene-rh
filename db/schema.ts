export const createNewsletterTable=`
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL COLLATE NOCASE,
  locale TEXT NOT NULL DEFAULT 'pt',
  source TEXT NOT NULL DEFAULT 'site',
  consented_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'subscribed'
)`;

export const createNewsletterEmailIndex=`
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_subscribers_email
ON newsletter_subscribers(email)
`;
