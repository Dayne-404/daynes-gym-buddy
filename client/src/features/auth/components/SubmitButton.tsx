const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="
        w-full h-15
        rounded-2xl
        bg-gradient-brand text-primary-foreground
        shadow-primary
        font-medium
        cursor-pointer
        transition-all duration-200
        hover:opacity-90
        active:scale-[0.98]
        focus:outline-none
        focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30
      "
    >
      Register
    </button>
  );
};

export default SubmitButton;
