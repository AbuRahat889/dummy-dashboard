export default function FullTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        {/* Skeleton Body */}
        <tbody className="animate-pulse">
          {Array.from({ length: 10 }).map((_, index) => (
            <tr
              key={index}
              className="text-sm text-textColor font-normal leading-normal bg-white"
            >
              {/* Index */}
              <td className="py-2 px-4 text-left w-8">
                <div className="h-4 w-4 bg-gray-300 rounded" />
              </td>

              {/* User Info */}
              <td className="py-2 px-4 text-left flex items-center">
                <div className="h-10 w-10 bg-gray-300 rounded-full mr-2" />
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                </div>
              </td>

              {/* Email */}
              <td className="py-2 px-4 text-left text-secondaryColor">
                <div className="h-4 w-32 bg-gray-300 rounded" />
              </td>

              {/* Service */}
              <td className="py-2 px-4 text-left text-secondaryColor">
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </td>

              {/* Amount */}
              <td className="py-2 px-4 text-left text-secondaryColor">
                <div className="h-4 w-16 bg-gray-300 rounded" />
              </td>

              {/* Status */}
              <td className="py-2 px-4 text-left">
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </td>

              {/* Created At */}
              <td className="py-2 px-4 text-left">
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
