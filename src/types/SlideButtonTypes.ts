export type ButtonType = {
    label: string;
    callback: () => void;
    onClick?: () => void;
    active?: boolean;
};

export type SlideButtonGroupType = {
    children: React.ReactElement<ButtonType> | React.ReactElement<ButtonType>[];
};
