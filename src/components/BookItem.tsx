import { useId, useMemo, useState } from "react";

type BookItemProps = {
  title: string;
  description?: string;
  imageUrl?: string;
  placeholderImageUrl?: string;
};

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="10" fill="#374151">
      No Image
    </text>
  </svg>
`);

export function BookItem({
  title,
  description,
  imageUrl,
  placeholderImageUrl = DEFAULT_PLACEHOLDER,
}: BookItemProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const descId = useId();

  const hasDescription = Boolean(description && description.trim().length > 0);

  const effectiveImageSrc = useMemo(() => {
    return imageUrl ? imageUrl : placeholderImageUrl;
  }, [imageUrl, placeholderImageUrl]);

  return (
    <article style={styles.card} aria-label={`Book: ${title}`}>
      <div style={styles.media}>
        <img
          src={imageError ? placeholderImageUrl : effectiveImageSrc}
          alt={imageUrl ? `Cover for ${title}` : `Placeholder cover for ${title}`}
          style={styles.image}
          loading="lazy"
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div role="status" style={styles.imageError}>
            Image unavailable
          </div>
        )}
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>

        {hasDescription && (
          <>
            <button
              type="button"
              onClick={() => setIsDescriptionVisible((prev) => !prev)}
              aria-expanded={isDescriptionVisible}
              aria-controls={descId}
              style={styles.button}
            >
              {isDescriptionVisible ? "Hide description" : "Show description"}
            </button>

            <div id={descId} hidden={!isDescriptionVisible} style={styles.description}>
              <p style={styles.p}>{description}</p>
            </div>
          </>
        )}

        {!hasDescription && <p style={styles.muted}>No description provided.</p>}
      </div>
    </article>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "grid",
    gridTemplateColumns: "110px 1fr",
    gap: 12,
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    alignItems: "start",
  },
  media: { width: 110 },
  image: {
    width: 96,
    height: 96,
    objectFit: "cover",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    display: "block",
  },
  imageError: { marginTop: 6, fontSize: 12, color: "red" },
  content: {},
  title: { margin: "0 0 8px 0", fontSize: 18 },
  button: {
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#000",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  description: { marginTop: 10 },
  p: { margin: 0 },
  muted: { margin: "10px 0 0 0", color: "#64748b" },
};
