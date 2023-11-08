"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useContextApi } from "source/api/ApiContext";
import { WithId } from "source/api/firebase";

export default function ContractPage({ params }: { params: { id: string } }) {
  // params
  const templateId = params.id;
  // context
  const api = useContextApi();
  const [template, setTemplate] = useState<WithId<Template> | null>();
  // side effects
  useEffect(() => {
    api.fetchTemplate(templateId).then(setTemplate);
  }, [api, templateId]);
  // UI
  if (template === undefined) return <h1>Carregando...</h1>;
  if (!template) return <h1>Não encontrado</h1>;
  return (
    <div>
      <h1>Página com todos os contratos:</h1>
      <div>{template.template}</div>
    </div>
  );
}
