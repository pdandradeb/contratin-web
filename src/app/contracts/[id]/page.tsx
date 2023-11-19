"use client";

import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import { useContextApi } from "source/api/ApiContext";
import { WithId } from "source/api/firebase";
import { addFieldToState } from "source/api/templates/addFieldToState";
import {
  Fields,
  getFieldsFromState,
} from "source/api/templates/getFieldsFromTemplate";
import {
  State,
  getInitialStateFromTemplate,
} from "source/api/templates/getInitialStateFromTemplate";
import { updateTemplateWithState } from "source/api/templates/updateTemplateWithState";

function FieldsRender({
  state,
  fields,
  setState,
}: {
  state: State;
  fields: Fields;
  setState: (value: State) => void;
}) {
  return (
    <div>
      {Object.entries(fields).map(([param, value]) => {
        if ("type" in value) {
          return (
            <div
              key={param}
              style={{ marginTop: 2, borderWidth: 1, borderColor: "#000" }}
            >
              <input
                type="text"
                name={param}
                placeholder={value.state as string}
                value={state[value.state as string]}
                onChange={(ev) =>
                  setState({
                    ...state,
                    [value.state as string]: ev.target.value,
                  })
                }
              />
            </div>
          );
        }
        return (
          <div key={param} style={{ marginTop: 20 }}>
            <FieldsRender fields={value} state={state} setState={setState} />
            {Array.isArray(value) ? (
              <input
                type="button"
                value="+"
                onClick={() => setState(addFieldToState(state, param))}
              />
            ) : null}
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
  }, [template]);
  useEffect(() => {
    if (!state) return;
    if (!template) return;

    setFields(getFieldsFromState(state));
    setResult(updateTemplateWithState(template.template, state));
  }, [state, template]);
  // UI
  if (template === undefined) return <h1>Carregando...</h1>;
  if (!template) return <h1>Não encontrado</h1>;
  if (!state || !fields) return null;
  console.log("state", state);
  console.log("fields", fields);
  return (
    <div>
      <h1>Página com todos os contratos:</h1>
      <FieldsRender fields={fields} state={state} setState={setState} />
      <Markdown>{result}</Markdown>
    </div>
  );
}
