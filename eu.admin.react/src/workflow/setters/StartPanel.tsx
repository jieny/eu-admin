import { memo } from "react";
import React from "react";
// import { Avatar, Space } from "antd";
// import { Icon } from "@/components/Icon";
import MemberSelect from "@/workflow-editor/components/MemberSelect";
// import { useTranslate } from "../../workflow-editor/react-locales";
// import { VF } from "@src/dsl/VF";
// import FormPage from "@src/pages/common/formPage";
// import { IApproverSettings } from "@/workflow-editor/classes/vlife";
import { FormVo } from "@/api/Form";

/**
 * // 审批节点信息
export interface AuditInfo extends IModel{
  auditList: NodeUserInfo[];  // 常规审批对象
  emptyPass: string;  // 审批人为空时策略
  handleType: string;  // 办理人员类型
  auditLevel: AuditLevel;  // 逐级审批对象
  transfer:boolean;// 转办
  addSign:boolean;// 加签
  recall:boolean;//撤回
  rollback:boolean;//回退
  rejected:boolean;//拒绝
  fields:FlowField[];//流程字段配置
}
 */

export const StartPanel = memo((props: { value?: any; formVo?: FormVo; onChange?: (value?: any) => void }) => {
  const [initValue, setInitValue] = React.useState<any[]>();
  return (
    <>
      流程发起人
      <MemberSelect
        // read={read || disabled}
        multiple={true}
        value={initValue ?? props.value?.auditList ?? []}
        // value={initValue}
        onDataChange={(data?: any[]) => {
          data = data?.map((f: any) => {
            return { ...f, userType: "assignee" };
          });
          setInitValue(data);
          //仅需要id即可
          props?.onChange?.(data);
        }}
        showUser={true}
      />
      {/* <Space size={16} wrap>
        <Avatar>U</Avatar>
        <Avatar>U</Avatar>
        <Avatar>U</Avatar>
        <Avatar>U</Avatar>
        <Icon name="PlusOutlined" className="icon" />
      </Space> */}
    </>

    // <FormPage
    //   terse
    //   fontBold
    //   type="iApproverSettings"
    //   formData={props.value}
    //   onDataChange={props.onChange}
    //   reaction={[
    //     VF.then("nodeType").value("start"),
    //     VF.then(
    //       "nodeType",
    //       "joinType",
    //       "emptyPass",
    //       "emptyUserId",
    //       "handleType",
    //       "transfer",
    //       "addSign",
    //       "rollback",
    //       "rejected",
    //       "auditLevel",
    //       "fields"
    //     ).hide(),
    //     VF.then("entityType").value(props?.formVo?.entityType).hide(),
    //     VF.field("handleType").default("general"),
    //     VF.field("handleType").eq("general").then("auditList").show().title("流程发起人")

    //     // VF.then("recall").title("111111111"),
    //     // VF.field("fields").default(
    //     //   props?.formVo?.fields
    //     //     .filter((f) => f.x_hidden !== true)
    //     //     .map((f) => {
    //     //       return { title: f.title, fieldName: f.fieldName };
    //     //     })
    //     // ),
    //   ]}
    // />
  );
});
