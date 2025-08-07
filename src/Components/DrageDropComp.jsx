{
  /* Drag and drop component */
}
<div className=" flex flex-col gap-0 flex-1">
  <Controller
    name="taskimage"
    control={control}
    rules={{
      required: {
        value: true,
        message: "Task Image is required.",
      },
      validate: {
        sizeLessthan5MB: (file) => {
          if (file && file.length > 0 && file[0].size > 5000000) {
            return "image size must be less than 5 MB";
          }
          return true;
        },
      },
    }}
    render={({ field: { onChange, onBlur, value, name, ref } }) => {
      const onDrop = useCallback(
        (acceptedFiles) => {
          // Update React Hook Form's state with the accepted files
          onChange(acceptedFiles);
        },
        [onChange]
      );

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
      });

      return (
        <div className="flex flex-col w-full h-full">
          <label htmlFor="curpwd" className="font-semibold mb-1">
            Upload Image
          </label>

          <div {...getRootProps()} className="h-full">
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="border border-[#A1A3AB] text-[#A1A3AB] rounded-sm h-full p-4 flex flex-col justify-center items-center">
                <LuImageUp className="w-16 h-16 mx-auto" />
                <small>Drop the files here</small>
              </div>
            ) : (
              <div className="border border-[#A1A3AB] text-[#A1A3AB] rounded-sm h-full p-4 flex flex-col justify-between">
                <LuImageUp className="w-16 h-16 mx-auto" />
                <small className="text-sm text-center">
                  Drag & Drop files here
                </small>
                {/* <p className="text-sm text-center">or</p> */}
                <div className="relative flex flex-col justify-center">
                  <div className="flex justify-center">
                    <label
                      type="button"
                      htmlFor="taskImage"
                      className="py-1 px-3 mb-1 border border-[#A1A3AB] text-sm text-[#A1A3AB] bg-transparent flex items-center gap-1 rounded-lg cursor-pointer hover:bg-[#A1A3AB] hover:text-white"
                    >
                      Browse
                    </label>
                  </div>

                  {/* Display file name */}
                  {value && value.length > 0 ? (
                    <div className="flex items-center gap-1 text-blue-600">
                      <small>File:</small>
                      <small>{`${value[0].name.substring(0, 18)}...`}</small>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }}
  />

  {errors.taskimage ? (
    <small className="text-red-500">{errors.taskimage.message}</small>
  ) : (
    <small className="opacity-0">Test</small>
  )}
</div>;
