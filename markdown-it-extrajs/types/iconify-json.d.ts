export declare const getIcons: (unoCSSUrl?: string) => Promise<string[]>;
export declare const createIconLoader: (iconifyJsonCDN?: string, iconifyJsonCDNParams?: string) => (key: string) => () => Promise<any>;
