export const secureElementManager: SecureElementManager = {} as SecureElementManager

export interface SecureElementManager extends EventTarget {
    onsepresent?: (event: ReaderEvent) => any
    onseremoval?: (event: ReaderEvent) => any
    getReaders(): Promise<Reader[]>
    shutdown(): Promise<void>
}

export interface ReaderEvent extends Event {
    readonly reader: Reader
}

export interface Reader {
    readonly isSEPresent: boolean
    readonly name: string
    readonly secureElementType: SecureElementType
    readonly isRemovable: boolean
    openSession(): Promise<Session>
    closeSessions(): Promise<void>
    reset(): Promise<void>
}

export enum SecureElementType {
    'uicc',
    'smartcard',
    'ese',
    'sd',
    'other',
}

export interface Session {
    readonly reader: Reader
    readonly historicalBytes?: Uint8Array
    openBasicChannel(aid?: Uint8Array, p2?: number): Promise<Channel>
    openSupplementaryChannel(aid?: Uint8Array, p2?: number): Promise<Channel>
    close(): Promise<void>
}

export interface Channel {
    readonly session: Session
    readonly channelType: ChannelType
    readonly openResponse?: SEResponse
    timeout?: number
    selectNext(): Promise<SEResponse>
    transmit(cmd: SECommand): Promise<SEResponse>
    transmitRaw(cmd: Uint8Array): Promise<Uint8Array>
    close(): Promise<void>
}

export enum ChannelType {
    'basic',
    'supplementary',
}

export interface SECommand {
    new (
        cla: number,
        ins: number,
        p1: number,
        p2: number,
        data?: Uint8Array,
        le?: number,
        isExtended?: boolean,
    ): SECommand
    cla: number
    ins: number
    p1: number
    p2: number
    data?: Uint8Array
    le: number
    isExtended: boolean
}

export interface SEResponse {
    new (raw: Uint8Array): SEResponse
    readonly channel: Channel
    readonly sw1: number
    readonly sw2: number
    readonly data: Uint8Array
    isStatus(sw1?: number, sw2?: number): boolean
}
