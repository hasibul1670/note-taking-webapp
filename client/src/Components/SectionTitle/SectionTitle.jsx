/* eslint-disable react/prop-types */

const SectionTitle = ({ heading }) => {
  return (
    <div className="mx-auto text-center md:w-6/12 my-4">
      <h3 className=" text-xl lg:text-3xl text-blue-900 font-bold  border-y-[1px] border-red-700 py-2">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
