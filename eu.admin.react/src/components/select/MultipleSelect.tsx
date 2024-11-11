import { Avatar, Checkbox, Tooltip } from "antd";
import { ISelect, VfBaseProps } from "@/dsl/component";

/**
 * 数据选择组件
 */
export interface MultipleTreeSelectProps extends VfBaseProps<string[]> {
  label?: string; // 标签
  tooltip?: string; // 提示信息
  multiple?: boolean; //多选
  selectData: ISelect[];
}
// const color = [
//   "blue",
//   "cyan",
//   "green",
//   "grey",
//   "indigo",
//   "light-blue",
//   "light-green",
//   "lime",
//   "amber",
//   "orange",
//   "pink",
//   "purple",
//   "red",
//   "teal",
//   "violet",
//   "yellow"
// ];
export default (props: MultipleTreeSelectProps) => {
  const { selectData, className, tooltip, value, multiple = true, onDataChange } = props;
  return (
    <div className={`${className}`}>
      {multiple && (
        <div className="font-bold flex justify-between pb-5">
          <div className="items-start">
            全选
            {tooltip && (
              <Tooltip title={tooltip}>
                <i className=" icon-help_outline" />
              </Tooltip>
            )}
          </div>
          <div className="items-end  pr-10">
            <Checkbox
              // value={item.value}
              checked={value?.length === selectData.length}
              onChange={() => {
                if (value?.length === selectData.length) {
                  onDataChange([]);
                } else {
                  onDataChange(selectData.map(item => item.value));
                }
              }}
            />
          </div>
        </div>
      )}
      <>
        {selectData.map((item, index) => {
          return (
            <div
              key={`${index}`}
              onClick={() => {
                if (multiple) {
                  if (value?.includes(item.value)) {
                    onDataChange(value.filter(f => f !== item.value));
                  } else {
                    onDataChange([...(value ? value : []), item.value]);
                  }
                } else {
                  if (value?.includes(item.value)) {
                    onDataChange([]);
                  } else {
                    onDataChange([item.value]);
                  }
                }
              }}
              className="flex justify-between cursor-pointer  hover:bg-slate-100 rounded"
            >
              <div className="items-start ">
                <Avatar
                  // color={color[index] as AvatarColor}
                  className=" relative"
                  // size="extra-small"
                  style={{ margin: 4 }}
                  alt="User"
                >
                  {item.label?.substring(0, 1)}
                </Avatar>
                <span className=" ml-2">{item.label}</span>
              </div>
              <div className="pr-10 flex items-center  justify-center">
                <Checkbox value={item.value} checked={value?.includes(item.value)} />
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};
