import OracleTuner from "@/components/Oracle/OracleTuner.tsx";
import { OracleSettingsProvider } from "@/context/OracleSettingsContext";

export default function OracleTunerPage() {
  return (
    <OracleSettingsProvider>
      <OracleTuner />
    </OracleSettingsProvider>
  );
}