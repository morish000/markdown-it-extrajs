export declare const getIcons: (unoCSSUrl?: string) => Promise<string[]>;
export declare const createIconLoader: (iconifyJsonCDN?: string) => (key: string) => () => Promise<any>;
