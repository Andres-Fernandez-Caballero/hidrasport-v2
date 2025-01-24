export interface ILink {
  text: string;
  url: string;
  subLinks?: ILink[];
}

export interface LinkImage extends ILink {
  image: string;
}