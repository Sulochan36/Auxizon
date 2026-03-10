import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FormInput = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    required = false,
    error,
    ...props
}) => {
    return (
        <div className="space-y-1 w-full mb-5">
            {label && (
                <Label className="font-bold tracking-tight text-balance text-neutral-900 text-[18px]" htmlFor={name}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}

            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
                className="rounded-full px-5 py-6 bg-white"
            />

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}

export default FormInput