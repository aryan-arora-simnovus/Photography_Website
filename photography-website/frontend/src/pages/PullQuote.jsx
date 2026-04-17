export default function PullQuote({ children }) {
  return (
    <blockquote className="text-2xl md:text-3xl font-serif italic text-nature-forest text-center my-16 px-6 leading-normal">
      “{children}”
    </blockquote>
  );
}
