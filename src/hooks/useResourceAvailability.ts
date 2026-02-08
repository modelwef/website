import { useEffect, useState } from 'react';

export const useResourceAvailability = (url?: string | null) => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!url) {
      setIsAvailable(false);
      return;
    }

    let isActive = true;

    fetch(url, { method: 'HEAD' })
      .then((response) => {
        if (isActive) {
          setIsAvailable(response.ok);
        }
      })
      .catch(() => {
        if (isActive) {
          setIsAvailable(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [url]);

  return isAvailable;
};
