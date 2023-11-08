"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useContextApi } from "source/api/ApiContext";
import { WithId } from "source/api/firebase";

export default function ContractsPage() {
  // context
  const api = useContextApi();
  const [templates, setTemplates] = useState<WithId<Template>[]>();
  // side effects
  useEffect(() => {
    api.fetchTemplates().then(setTemplates);
  }, [api]);
  // UI
  if (!templates) return <h1>Carregando...</h1>;
  return (
    <div>
      <h1>Página com todos os contratos:</h1>
      {templates.map((template) => (
        <div key={template.id}>
          <Link href={`contracts/${template.id}`}>{template.name}</Link>
        </div>
      ))}
    </div>
  );
}
