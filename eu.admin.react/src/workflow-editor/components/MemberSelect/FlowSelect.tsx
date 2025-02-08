//和流程相关的人员选择模块
import { useCallback, useMemo, useState } from "react";
import { Tabs, Col, Row } from "antd";
import MultipleSelect from "@/components/select/MultipleSelect";
import { ISelect, VfBaseProps } from "@/dsl/component";
import { NodeUserInfo } from "../../classes/vlife";
import Scrollbars from "react-custom-scrollbars";
import DynamicNodeSelect from "./DynamicNodeSelect";
import { Icon } from "@/components";

const TabPane = Tabs.TabPane;

export interface FlowSelectProps extends VfBaseProps<Partial<NodeUserInfo>[]> {
  showUser?: boolean; //仅使用用户
  multiple?: boolean; //是否能多选
  groupSelectData?: ISelect[];
  deptSelectData?: ISelect[];
  userSelectData?: ISelect[];
}

export default (props: FlowSelectProps) => {
  const { onDataChange, value, showUser = false, multiple = true, groupSelectData, deptSelectData, userSelectData } = props;
  // const [search, setSearch] = useState<string>(); //搜索的数据
  const [activeKey, setActiveKey] = useState<string>("assignee"); //当前页签

  //权限组数据
  const groups = useMemo((): Partial<NodeUserInfo>[] => {
    return value?.filter(v => v.userType === "group") || [];
  }, [value]);

  //用户数据
  const users = useMemo((): Partial<NodeUserInfo>[] => {
    return value?.filter(v => v.userType === "assignee") || [];
  }, [value]);

  //dept数据
  const depts = useMemo((): Partial<NodeUserInfo>[] => {
    return value?.filter(v => v.userType === "dept") || [];
  }, [value]);

  //动态节点数据
  const dynamics = useMemo((): Partial<NodeUserInfo>[] => {
    return value?.filter(v => v.userType === "dynamic") || [];
  }, [value]);
  // const [dynamicFlowData, setDynamicFlowData] = useState<ISelect[]>(); //用户数据

  //选中或者取消一个节点
  const selectNode = useCallback(
    (selectDatas: ISelect[], type: string, ...ids: string[]) => {
      const vv = [
        ...(value?.filter(v => v.userType !== type) || []),
        ...(ids?.map(v => {
          return {
            userType: type,
            objectId: v,
            label: selectDatas.filter(s => s.value === v)?.[0].label
          };
        }) || [])
      ];
      onDataChange(vv);
    },
    [JSON.stringify(value), onDataChange]
  );
  return (
    <div className=" w-full h-full ">
      <Row gutter={16}>
        <Col className="gutter-row" span={18}>
          <Scrollbars autoHide={true} className="h-full w-full" style={{ height: 400 }}>
            <Tabs className="mr-2 h-full " activeKey={activeKey} onTabClick={setActiveKey}>
              <TabPane tab="成员" key="assignee">
                {userSelectData && (
                  <MultipleSelect
                    selectData={userSelectData || []}
                    multiple={multiple}
                    value={users.map(v => v.objectId || "")}
                    onDataChange={(vals?: string[]) => {
                      selectNode(userSelectData, "assignee", ...(vals || []));
                    }}
                  />
                )}
              </TabPane>

              {showUser === false && (
                <TabPane tab="部门" key="dept">
                  {deptSelectData && (
                    <MultipleSelect
                      selectData={deptSelectData || []}
                      value={depts.map(v => v.objectId || "")}
                      onDataChange={(vals?: string[]) => {
                        selectNode(deptSelectData, "dept", ...(vals || []));
                      }}
                    />
                  )}
                </TabPane>
              )}
              {showUser === false && (
                <TabPane tab="权限组" key="group">
                  {groupSelectData && (
                    <MultipleSelect
                      selectData={groupSelectData || []}
                      value={groups.map(v => v.objectId || "")}
                      onDataChange={(vals?: string[]) => {
                        selectNode(groupSelectData, "group", ...(vals || []));
                      }}
                    />
                  )}
                </TabPane>
              )}
              {showUser === false && (
                <TabPane tab="动态" key="dynamic">
                  <DynamicNodeSelect
                    value={dynamics}
                    onDataChange={(data?: Partial<NodeUserInfo>[]) => {
                      onDataChange([...(value?.filter(v => v.userType !== "dynamic") || []), ...(data || [])]);
                    }}
                  />
                </TabPane>
              )}
            </Tabs>
          </Scrollbars>
        </Col>
        <Col className="gutter-row" span={6}>
          <div className=" flex justify-between">
            <div className=" item-start">
              <span className=" font-bold pl-5 pr-5">已选择</span>({value?.length || 0})
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                onDataChange([]);
              }}
            >
              清空
            </div>
          </div>
          {/* 1. 成员已选择 */}
          {users && users.length > 0 && (
            <>
              <div className="pl-10 text-gray-400 font-bold">成员</div>
              <div className="flex flex-wrap">
                {users.map((user, index) => {
                  return (
                    <div key={`${index}_role`} className="inline-flex p-5 ">
                      <div
                        onClick={() => {
                          onDataChange(value?.filter(v => v.objectId !== user.objectId));
                        }}
                        className="font-size12 bg-slate-200 hover:bg-slate-300 p-5 rounded font-thin cursor-pointer "
                      >
                        {user.label}
                        {(user.label === undefined || user.label === null) &&
                          user.userType === "assignee" &&
                          userSelectData &&
                          userSelectData.filter(data => data.value === user.objectId)?.[0]?.label}

                        <Icon name="CloseOutlined" className="font-size10 ml-5 icon cursor-pointer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {/* 2. 部门已选择 */}
          {depts && depts.length > 0 && (
            <>
              <div className="pl-2 text-gray-400 font-bold">部门</div>
              <div className="flex flex-wrap">
                {depts.map((dept, index) => {
                  return (
                    <div key={`${index}_role`} className="inline-flex p-1 ">
                      <div
                        onClick={() => {
                          onDataChange(value?.filter(v => v.objectId !== dept.objectId));
                        }}
                        className="  text-sm bg-slate-200 hover:bg-slate-300 p-1 rounded font-thin cursor-pointer "
                      >
                        {dept.label}
                        {(dept.label === undefined || dept.label === null) &&
                          dept.userType === "dept" &&
                          deptSelectData &&
                          deptSelectData.filter(data => data.value === dept.objectId)?.[0]?.label}

                        <i className=" ml-1 icon-clear" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* 3. 权限组已选择 */}
          {groups && groups.length > 0 && (
            <>
              <div className="pl-2 text-gray-400 font-bold">权限组</div>
              <div className="flex flex-wrap">
                {groups.map((group, index) => {
                  return (
                    <div key={`${index}_role`} className="inline-flex p-1 ">
                      <div
                        onClick={() => {
                          onDataChange(value?.filter(v => v.objectId !== group.objectId));
                        }}
                        className="  text-sm bg-slate-200 hover:bg-slate-300 p-1 rounded font-thin cursor-pointer "
                      >
                        {group.label}
                        {(group.label === undefined || group.label === null) &&
                          group.userType === "group" &&
                          groupSelectData &&
                          groupSelectData.filter(data => data.value === group.objectId)?.[0]?.label}

                        <i className=" ml-1 icon-clear" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {dynamics && dynamics.length > 0 && (
            <>
              <div className="pl-2 text-gray-400 font-bold">动态</div>
              <div className="flex flex-wrap">
                {dynamics.map((dynamic, index) => {
                  return (
                    <div key={`${index}_dynamic`} className="inline-flex p-1 ">
                      <div
                        onClick={() => {
                          onDataChange(value?.filter(v => v.objectId !== dynamic.objectId));
                        }}
                        className=" text-sm bg-slate-200 hover:bg-slate-300 p-1 rounded font-thin cursor-pointer "
                      >
                        {dynamic.label}
                        <i className=" ml-1 icon-clear" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
