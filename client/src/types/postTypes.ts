export type PostType = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string | Date;
};


export type PostFormType = Pick<PostType, 'id' | 'status'>;

// 'status' | 'id' пишем это если например мы не будем исп-ть статус или id
