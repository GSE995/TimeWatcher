import { Timer } from 'models';
import { useCallback } from 'react';

export type CheckTimerProps = {
  timer: Timer;
  className?: string;
  checked: boolean;
  onCheck: (id: string) => void;
};

export const CheckTimer = ({ timer, className, onCheck, checked }: CheckTimerProps) => {
  const onChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onCheck(e.target.id);
    },
    [onCheck]
  );

  return (
    <div className={className}>
      <input id={timer.id} type="checkbox" checked={checked} onChange={onChecked} />
    </div>
  );
};
