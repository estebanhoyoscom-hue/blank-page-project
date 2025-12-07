interface TestProgressProps {
  current: number;
  total: number;
  color: string;
}

const TestProgress = ({ current, total, color }: TestProgressProps) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Pregunta {current + 1} de {total}
        </span>
        <span className="font-medium" style={{ color }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${progress}%`,
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
};

export default TestProgress;
