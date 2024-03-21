export {};

declare global {
  type UserInfo = Partial<{ id: string; avatar: string; name: string; phone: string }>;

  type DeviceStatus = 'busy' | 'online' | 'offline'; // 运行 | 空闲 | 离线

  type ResponseData<T> = { code: number; data: T; msg: string };
}
