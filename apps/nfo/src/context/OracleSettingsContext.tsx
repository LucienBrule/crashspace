import React, { createContext, useContext, useState, ReactNode } from 'react';
import { z } from 'zod';

export const TunerSettingsSchema = z.object({
  width: z.number().min(1).max(1000),
  grayScale: z.string(),
  spaceChars: z.number().min(0).max(10),
  lineThickness: z.number().min(0).max(2),
  bloom: z.boolean(),
  invert: z.boolean(),
  inputScale: z.number().min(0.1).max(10),
  outputZoom: z.number().min(0.1).max(10),
});

export type TunerParams = z.infer<typeof TunerSettingsSchema>;

const defaultParams: TunerParams = {
  width: 100,
  grayScale: ' .:-=+*#%@',
  spaceChars: 0,
  lineThickness: 1.0,
  bloom: false,
  invert: false,
  inputScale: 1,
  outputZoom: 1,
};

interface OracleSettingsContextType {
  params: TunerParams;
  setParams: React.Dispatch<React.SetStateAction<TunerParams>>;
}

const OracleSettingsContext = createContext<OracleSettingsContextType>({
  params: defaultParams,
  setParams: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const OracleSettingsProvider = ({ children }: ProviderProps) => {
  const [params, setParams] = useState<TunerParams>(defaultParams);
  return (
    <OracleSettingsContext.Provider value={{ params, setParams }}>
      {children}
    </OracleSettingsContext.Provider>
  );
};

export const useOracleSettings = () => useContext(OracleSettingsContext);
