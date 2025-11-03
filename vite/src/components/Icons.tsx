import React from "react";
import DOMPurify from "dompurify";

// bardzo prosty cache w pamięci procesu
const svgCache = new Map<string, string>();

type IconFromApiProps = {
    name: string;            // "prefix:name" np. "mdi:home-outline"
    size?: number;           // wysokość w px
    color?: string;          // kolor stroke/fill, np. "#334155"
    className?: string;
    title?: string;
};

export const IconFromApi: React.FC<IconFromApiProps> = ({
                                                            name,
                                                            size = 20,
                                                            color,
                                                            className,
                                                            title
                                                        }) => {
    const [svg, setSvg] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let isMounted = true;
        const key = `${name}@${size}@${color ?? ""}`;

        async function load() {
            if (svgCache.has(key)) {
                setSvg(svgCache.get(key)!);
                return;
            }

            try {
                // API Iconify: https://api.iconify.design/{icon}.svg
                // Parametry: height i color
                const url =
                    `https://api.iconify.design/${encodeURIComponent(name)}.svg` +
                    `?height=${encodeURIComponent(String(size))}` +
                    (color ? `&color=${encodeURIComponent(color)}` : "");

                const res = await fetch(url, { mode: "cors" });
                if (!res.ok) throw new Error(`Icon fetch failed: ${res.status}`);
                const raw = await res.text();

                // sanityzacja
                const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { svg: true } });

                if (isMounted) {
                    svgCache.set(key, clean);
                    setSvg(clean);
                }
            } catch (e: any) {
                if (isMounted) setError(e?.message ?? "Icon load error");
            }
        }
        setSvg(null);
        setError(null);
        load();

        return () => {
            isMounted = false;
        };
    }, [name, size, color]);

    // fallback – proste kółko gdy ikona się ładuje lub błąd
    if (!svg || error) {
        return (
            <span
                className={className}
                title={title}
                style={{
                    display: "inline-block",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: "#e2e8f0"
                }}
            />
        );
    }

    return (
        <span
            className={className}
            title={title}
            style={{ display: "inline-flex", width: size, height: size }}
            // bezpiecznie wstrzyknięte po sanityzacji
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};