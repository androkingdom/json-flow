"use client";

export function VideoDemo() {
  return (
    <section className="px-6 pb-20 md:px-12 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div
          className="relative overflow-hidden rounded-2xl border shadow-2xl"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          {/* Browser Chrome */}
          <div
            className="flex items-center gap-2 border-b px-4 py-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div
              className="ml-4 flex-1 rounded-md px-3 py-1 text-xs"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-muted)",
              }}
            >
              jsonflow.app/web
            </div>
          </div>

          {/* Video */}
          <div className="relative aspect-video bg-black">
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="/jsonflow-demo-poster.png"
            >
              <source src="/jsonflow-demo.mp4" type="video/mp4" />
            </video>

            {/* Video Overlay Gradient */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {/* Video Caption */}
        <p className="mt-4 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          Real-time JSON editing with instant visual feedback
        </p>
      </div>
    </section>
  );
}
