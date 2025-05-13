export type PostType = {
  id: number;
  name?: string;
  status?: boolean;
  createdAt: string | Date;
};

export type PostFormType = Partial<Pick<PostType, 'id' | 'status'>> & Pick<PostType, 'name'>;

// 'если  нужно использовать PostFormType и для PATCH, и для POST, сделаем поля id и status необязательными
