import React, { useState } from 'react';
import {
  listPresets,
  loadPreset,
  deletePreset,
  savePreset,
} from '@/utils/localStorageUtils';
import { useOracleSettings } from '@/context/OracleSettingsContext';

export const PresetsMenu = () => {
  const { setParams, params } = useOracleSettings();
  const [presetName, setPresetName] = useState('');
  const [importText, setImportText] = useState('');
  const [presets, setPresets] = useState<string[]>(listPresets());

  const handleLoad = (name: string) => {
    const preset = loadPreset(name);
    if (preset) setParams(preset);
  };

  const handleDelete = (name: string) => {
    deletePreset(name);
    setPresets(listPresets());
  };

  const handleExport = (name: string) => {
    const preset = loadPreset(name);
    if (preset) {
      navigator.clipboard.writeText(JSON.stringify(preset, null, 2));
      alert(`Preset "${name}" copied to clipboard`);
    }
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(importText);
      if (typeof data === 'object' && data !== null) {
        const name = prompt('Enter name for imported preset:');
        if (name) {
          savePreset(name, data);
          setPresets(listPresets());
        }
      }
    } catch (err) {
      console.error(err);
      alert('Invalid JSON');
    }
  };

  const handleSave = () => {
    if (!presetName.trim()) return;
    savePreset(presetName.trim(), params);
    setPresets(listPresets());
    setPresetName('');
  };

  return (
    <div className="text-sm space-y-4">
      <div className="font-medium text-cyan-200 mb-3 pb-2 border-b border-zinc-700/50">Presets</div>
      <ul className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
        {presets.length > 0 ? (
          presets.map((name) => (
            <li key={name} className="flex items-center justify-between gap-2 py-1.5 px-2 bg-black/30 rounded border border-zinc-800/50 group hover:border-zinc-700/70 transition-colors">
              <span className="truncate text-zinc-300">{name}</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleLoad(name)}
                  className="text-xs px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 hover:bg-cyan-800/60 transition-colors"
                >
                  Load
                </button>
                <button
                  onClick={() => handleExport(name)}
                  className="text-xs px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/70 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={() => handleDelete(name)}
                  className="text-xs px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-300 hover:bg-red-900/70 hover:text-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-zinc-500 italic py-2">No presets saved</li>
        )}
      </ul>

      <div className="pt-2 border-t border-zinc-800/40">
        <div className="text-zinc-400 text-xs mb-2">Save Current Settings</div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="New preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            className="flex-1 px-2 py-1.5 bg-black/60 text-cyan-300 text-sm
              border border-zinc-700 focus:border-cyan-500 placeholder-zinc-600
              rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400
              transition-all duration-200"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded-md bg-cyan-900/60 text-cyan-200
              hover:bg-cyan-800/80 transition-colors disabled:opacity-50
              disabled:pointer-events-none"
            disabled={!presetName.trim()}
          >
            Save
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-800/40">
        <div className="text-zinc-400 text-xs mb-2">Import Settings</div>
        <div className="flex flex-col gap-2">
          <textarea
            placeholder="Paste JSON here"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            className="w-full h-20 bg-black/60 text-cyan-300 text-sm
              border border-zinc-700 focus:border-cyan-500 placeholder-zinc-600
              rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-400
              transition-all duration-200 resize-none"
          />
          <button
            onClick={handleImport}
            className="px-3 py-1.5 rounded-md bg-zinc-800/70 text-zinc-300
              hover:bg-zinc-700/80 transition-colors disabled:opacity-50
              disabled:pointer-events-none"
            disabled={!importText.trim()}
          >
            Import
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(120, 120, 130, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(140, 140, 150, 0.6);
        }
      `}</style>
    </div>
  );
};