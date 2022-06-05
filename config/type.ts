export type MenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  key: React.Key;
};

export type ArticleBriefInfo = {
  author: string; // 作者
  date: string; // 发布日期
  title: string; // 标题
  intro: string; // 简介
  tags: string[]; // 标签
  coverImage: string; // 封面图片
  views: number; // 浏览量
  like: number; // 点赞数
  comments: number; // 评论数
  id: number; // 文章id
};

export type ArticleInfo = {
  avatarUrl: string; // 作者头像
  content: string; // 文章内容
} & ArticleBriefInfo;

export type ListResponse = {
  success: boolean;
  list: ArticleBriefInfo[];
};

export type InfoResponse = {
  success: boolean;
  info: ArticleInfo;
};

export type LoginResponse = {
  success: boolean;
  token: string;
};

export type ModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

export type MailResponse = {
  success: boolean;
};