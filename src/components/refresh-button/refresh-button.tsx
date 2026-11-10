"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  useEffect(() => {
    if(!autoRefresh) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, 25000);

    return () => window.clearInterval(timer);
  },[autoRefresh, router])

  return (
    <>
    <button type="button" onClick={() => router.refresh()}>
      Actualizar
    </button>
    <label>
        <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(event) => setAutoRefresh(event.target.checked)}
        />
        Actualizar automáticamente
    </label>
    </>
  );
}