const SubmitButton = ({label}) => {
    return (
        <div className="flex justify-center mt-6 mb-3">
            <button className="bg-black text-white rounded-md py-2 px-3">{label}</button>
        </div>
    )
}

export default SubmitButton;