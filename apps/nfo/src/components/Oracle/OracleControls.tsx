import React from 'react';

interface OracleControlsProps {
  params: {
    width: number;
    grayScale: string;
    spaceChars: number;
    thickenLines: boolean;
    bloom: boolean;
    invert: boolean;
  };
  onChange: (newParams: any) => void;
}

const OracleControls: React.FC<OracleControlsProps> = ({ params, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...params,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div>
      <label>
        Width:
        <input
          type="number"
          name="width"
          value={params.width}
          onChange={handleChange}
        />
      </label>
      <label>
        Gray Scale:
        <input
          type="text"
          name="grayScale"
          value={params.grayScale}
          onChange={handleChange}
        />
      </label>
      <label>
        Space Characters:
        <input
          type="number"
          name="spaceChars"
          value={params.spaceChars}
          onChange={handleChange}
        />
      </label>
      <label>
        Thicken Lines:
        <input
          type="checkbox"
          name="thickenLines"
          checked={params.thickenLines}
          onChange={handleChange}
        />
      </label>
      <label>
        Bloom:
        <input
          type="checkbox"
          name="bloom"
          checked={params.bloom}
          onChange={handleChange}
        />
      </label>
      <label>
        Invert:
        <input
          type="checkbox"
          name="invert"
          checked={params.invert}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default OracleControls;
