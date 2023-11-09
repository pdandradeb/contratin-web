"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useContextApi } from "source/api/ApiContext";
import { WithId } from "source/api/firebase";
import {
  Field,
  Fields,
  getFieldsFromTemplate,
} from "source/api/templates/getFieldsFromTemplate";
import {
  State,
  getInitialStateFromTemplate,
} from "source/api/templates/getInitialStateFromTemplate";
import { getPropertiesFromTemplate } from "source/api/templates/getPropertiesFromTemplate";

function FieldsRender({
  state,
  fields,
  updateState,
}: {
  state: State;
  fields: Fields;
  updateState: (param: string, value: string) => void;
}) {
  return (
    <div>
      {Object.entries(fields).map(([a, b]) => {
        if ("type" in b) {
          return (
            <div
              key={a}
              style={{ marginTop: 2, borderWidth: 1, borderColor: "#000" }}
            >
              <input
                type="text"
                name={a}
                placeholder={b.state as string}
                value={state[b.state as string]}
                onChange={(ev) =>
                  updateState(b.state as string, ev.target.value)
                }
              />
            </div>
          );
        }
        return (
          <div key={a} style={{ marginTop: 20 }}>
            <FieldsRender fields={b} state={state} updateState={updateState} />
          </div>
        );
      })}
    </div>
  );
}

export default function ContractPage({ params }: { params: { id: string } }) {
  // params
  const templateId = params.id;
  // context
  const api = useContextApi();
  const [template, setTemplate] = useState<WithId<Template> | null>();
  const [state, setState] = useState<State>();
  const [fields, setFields] = useState<Fields>();
  const [result, setResult] = useState("");
  // side effects
  // load template
  useEffect(() => {
    api.fetchTemplate(templateId).then(setTemplate);
  }, [api, templateId]);
  // parse template
  useEffect(() => {
    if (!template) return;
    setState(getInitialStateFromTemplate(template.template));
    setFields(getFieldsFromTemplate(template.template));
  }, [template]);
  useEffect(() => {
    if (!state) return;
    if (!template) return;
    let updatedText = template.template;
    getPropertiesFromTemplate(template.template).forEach((property) => {
      updatedText = updatedText.replaceAll(`$${property}`, state[property]);
    });
    setResult(updatedText);
  }, [state, template]);
  // UI
  if (template === undefined) return <h1>Carregando...</h1>;
  if (!template) return <h1>Não encontrado</h1>;
  if (!state || !fields) return null;
  console.log(state);
  return (
    <div>
      <h1>Página com todos os contratos:</h1>
      <FieldsRender
        fields={fields}
        state={state}
        updateState={(param, value) => {
          setState((state) => ({ ...state, [param]: value }));
        }}
      />
      <div>{result}</div>
    </div>
  );
}
