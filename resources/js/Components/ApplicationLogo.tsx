interface Props {
    className: string;
}

export default function ApplicationLogo({ className } : Props) {
    return (
        <img className={className} src="/assets/images/logo.svg">
        </img>
    );
}
