import React from "react";

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
  authorId: number; // 作者id
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
  msg?: string;
  needRegister?: boolean;
  username: string;
  userId: number | string;
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

export type RegisterResponse = {
  success: boolean;
  msg?: string;
};

export type LoginStatusResponse = {
  success: boolean;
  msg?: string;
  data: any;
};


export type LoginStatus = {
  status: boolean;
  username: string;
  userId: number | string;
}

export type LoginStatusContextProps = {
  loginStatus: LoginStatus;
  setLoginStatus: React.Dispatch<React.SetStateAction<LoginStatus>>;
}

export type AddResponse = {
  success: boolean;
  msg?: string;
  id?: number | string;
}

export type ListContext = {
  list: ArticleBriefInfo[];
  setList: React.Dispatch<React.SetStateAction<ArticleBriefInfo[]>>;
}

export type UserInfoResponse = {
  success: boolean;
  msg?: string;
  articleCount: number;
  articles: ArticleBriefInfo[];
}

export type AuthorArticleResponse = {
  success: boolean;
  msg?: string;
  list: ArticleBriefInfo[];
  author: string;
}

export type DeleteResponse = {
  success: boolean;
  msg?: string;
}