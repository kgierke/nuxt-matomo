export const useMatomo = () => {
  /**
   * Retrieve the Matomo tracker object from the window object
   *
   * @returns The Matomo tracker object
   */
  const getMatomoTracker = () => {
    return window._paq || [];
  };

  /**
   * Track an event with Matomo
   *
   * @param category - The Event Category (Videos, Music, Games, etc.)
   * @param action - The Event Action (Play, Pause, Duration, Add Playlist, etc.)
   * @param name - Optional: The events object name (eg. the video title, the song name, etc.)
   * @param value - Optional: The events object value (eg. the video duration, the song length, etc.)
   * @param callback
   * @param customData
   */
  const trackEvent = (
    category: string,
    action: string,
    name?: string,
    value?: number,
    callback?: () => void,
    customData?: any,
  ) => {
    const matomo = getMatomoTracker();

    matomo.push([
      "trackEvent",
      category,
      action,
      name,
      value,
      callback,
      customData,
    ]);
  };

  return {
    getMatomoTracker,
    trackEvent,
  };
};
