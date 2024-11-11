/**
 * 工作流分布内容展示组件
 */
import { useMemo } from "react";
import { Modal, Tag } from "antd";
import { FlowNode } from "@/api/workflow/Flow";
import { shotFormatDate } from "@/utils/func";
import classNames from "classnames";

export interface FlowStepProps extends FlowNode {}

export default (prop: FlowStepProps) => {
  // 审核中数量
  const historys = useMemo(() => {
    return prop.auditTaskList?.filter(p => p.auditTime !== null);
  }, [prop]);

  //抄送人
  // const assigneeEmptys = useMemo(() => {
  //   return prop.auditTaskList?.filter(p => p.assignee === null);
  // }, [prop]);

  const auditing = useMemo(() => {
    if (prop.nodeStatus === "pass" || prop.nodeStatus === null) {
      return prop.auditTaskList?.filter(p => p.auditTime === null);
    }
    return [];
  }, [prop]);
  return (
    <div>
      {prop.auditTaskList?.length === 1 && prop.endTime && (
        <div className=" h-5 flex pl-4 text-gray-500 items-center">{shotFormatDate(prop.endTime)}</div>
      )}
      <div
        className={` ${classNames({
          " !bg-blue-50 ": prop.nodeStatus === "recall"
        })}  bg-white rounded-md border ml-2 p-2 mb-2`}
      >
        <div className="  flex-grow border-b pb-2 font-bold">{prop.nodeName}</div>
        <div className={``}>
          {historys
            // ?.filter((f) => f.assignee)
            .map((item, index) => {
              return (
                <div className="py-1" key={`audit${index}`}>
                  {item.assigneeName && (
                    <div className=" flex justify-between">
                      <Tag
                        // size="large"
                        className={`${classNames({
                          "!bg-green-100": item.status === "pass",
                          "!bg-gray-100": item.status === "back",
                          "!bg-red-100": item.status === "reject"
                        })} justify-start`}
                      >
                        {item.assigneeName}
                        {item.description && <span className=" font-bold ml-2">{item.description}</span>}
                      </Tag>
                      <span className=" justify-end text-gray-500 text-xs">
                        {(prop.auditTaskList.length > 1 || prop.endTime === null) &&
                          item.auditTime &&
                          shotFormatDate(item.auditTime)}
                      </span>
                    </div>
                  )}
                  {item?.comment !== "" && (
                    <div className="p-1 mt-1 rounded-md bg-gray-50 text-gray-600  ">
                      {prop.nodeType === "notifier" && (
                        <div
                          onClick={() => {
                            Modal.info({
                              title: "抄送人员信息",
                              content: (
                                <div>
                                  {prop.target?.map(a => {
                                    return <div key={a.objectId}>{a.label}</div>;
                                  })}
                                </div>
                              )
                            });
                          }}
                          className=" cursor-pointer"
                        >
                          <i className=" icon-send mr-2" />
                          <span> {item.comment}</span>
                        </div>
                      )}
                      {prop.nodeType !== "notifier" && <span> {item.comment}</span>}
                    </div>
                  )}
                </div>
              );
            })}

          {auditing?.length > 0 && (
            <div
              onClick={() => {
                Modal.info({
                  title: "进行中的执行人",
                  content: (
                    <div>
                      {prop.target?.map(a => {
                        return <div key={a.objectId}>{a.label}</div>;
                      })}
                    </div>
                  )
                });
              }}
              className="cursor-pointer  border-t"
            >
              <div className=" p-1 m-1 rounded-2xl   bg-orange-100 ">
                <i className=" text-base icon-workflow_delayed" />
                <span className="font-bold text-orange-400">{`${auditing.length}名成员处理中...`}</span>
              </div>
            </div>
          )}
          {/* {prop.nodeType === "notifier" && (
              <div className=" p-1  bg-gray-100 rounded mt-1 ">
                <i className=" icon-send" />
                <span> 抄送给{`${prop.auditTaskList.length}名成员`}</span>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
};
