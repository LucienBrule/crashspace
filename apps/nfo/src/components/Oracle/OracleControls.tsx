import React, { useState } from "react";
import {
  TunerSettingsSchema,
  TunerParams,
} from "@/context/OracleSettingsContext";
import { z } from "zod";
import { PresetsMenu } from "@/components/Oracle/PresetsMenu.tsx";

interface OracleControlsProps {
  params: TunerParams;
  onChange: (newParams: TunerParams) => void;
}

const OracleControls: React.FC<OracleControlsProps> = ({
                                                         params,
                                                         onChange,
                                                       }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const entries = Object.entries(TunerSettingsSchema.shape) as [
    keyof TunerParams,
    z.ZodType<any>,
  ][];
  const basicKeys: (keyof TunerParams)[] = ["width", "grayScale"];
  const advancedKeys: (keyof TunerParams)[] = entries
      .map(([k]) => k)
      .filter((k) => !basicKeys.includes(k));

  const renderInput = (key: keyof TunerParams, schema: z.ZodType<any>) => {
    const value = params[key];
    if (typeof value === "boolean") {
      return (
          <label key={key} className="flex items-center mb-3 cursor-pointer group">
            <div className="relative">
              <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={(e) => onChange({ ...params, [key]: e.target.checked })}
                  className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-zinc-600 rounded-md
                          bg-black/50 peer-checked:bg-cyan-900 peer-checked:border-cyan-400
                          transition-all duration-200 peer-focus:ring-2 peer-focus:ring-cyan-400/50
                          peer-focus:ring-offset-1 peer-focus:ring-offset-black"></div>
              <div className="absolute inset-0 opacity-0 peer-checked:opacity-100
                          flex items-center justify-center text-cyan-300 transition-opacity">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="ml-2 text-sm font-medium text-zinc-200 group-hover:text-cyan-200 transition-colors">
            {key}
          </span>
          </label>
      );
    } else if (typeof value === "number") {
      return (
          <label key={key} className="block mb-3">
            <span className="text-sm font-medium text-zinc-300 block mb-1">{key}:</span>
            <input
                type="number"
                name={key}
                value={value}
                onChange={(e) => {
                  const parsed = Number(e.target.value);
                  onChange({ ...params, [key]: isNaN(parsed) ? 0 : parsed });
                }}
                className="px-2 py-1 w-full bg-black/60 text-cyan-300 text-sm
                      border border-zinc-700 focus:border-cyan-500
                      rounded-md block focus:outline-none focus:ring-1 focus:ring-cyan-400
                      transition-all duration-200"
            />
          </label>
      );
    } else {
      return (
          <label key={key} className="block mb-3">
            <span className="text-sm font-medium text-zinc-300 block mb-1">{key}:</span>
            <input
                type="text"
                name={key}
                value={value}
                onChange={(e) => onChange({ ...params, [key]: e.target.value })}
                className="px-2 py-1 w-full bg-black/60 text-cyan-300 text-sm
                      border border-zinc-700 focus:border-cyan-500
                      rounded-md block focus:outline-none focus:ring-1 focus:ring-cyan-400
                      transition-all duration-200"
            />
          </label>
      );
    }
  };

  return (
      <div className="px-4 py-3">
        <div className="flex flex-wrap gap-8 items-start">
          <div className="min-w-[240px] flex-1 bg-zinc-900/40 p-5 rounded-lg border border-zinc-800/70 shadow-md">
            <div className="flex flex-wrap justify-evenly items-start gap-8">
              <div className="w-full">
                <h3 className="font-semibold mb-4 text-cyan-200 text-lg border-b border-zinc-700/50 pb-2">Basic Settings</h3>
                <div className="space-y-1">
                  {entries
                      .filter(([k]) => basicKeys.includes(k))
                      .map(([k, schema]) => renderInput(k, schema))}
                </div>
                <button
                    className="mt-5 mb-2 text-cyan-400 hover:text-cyan-300 text-sm flex items-center transition-colors"
                    onClick={() => setShowAdvanced((prev) => !prev)}
                >
                  <span>{showAdvanced ? "Hide" : "Show"} Advanced</span>
                  <svg
                      className={`ml-1 w-4 h-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            {showAdvanced && (
                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                  <div className="flex flex-wrap justify-baseline items-start gap-8">
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium mb-3 text-cyan-200">Advanced Settings</h4>
                      {entries
                          .filter(([k]) => advancedKeys.includes(k))
                          .map(([k, schema]) => renderInput(k, schema))}
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800 min-w-[240px] shadow-lg">
                      <PresetsMenu />
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default OracleControls;