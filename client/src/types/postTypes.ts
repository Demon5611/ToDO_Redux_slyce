export type PostType = {
  [x: string]: string | number | Date;
    id: number;
    name: string;
  status?: boolean;

  };
  
export type PostFormType = Omit<PostType, 'status'>;  

// 'status' | 'id' пишем это если например мы не будем исп-ть статус или id