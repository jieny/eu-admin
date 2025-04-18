// import { message } from "antd";
import { useCallback } from "react";
import { getTheFiles } from "../utils/getFIles";
import { IWorkFlowNode } from "../interfaces";
import { useEditorEngine } from "./useEditorEngine";
import { useTranslate } from "../react-locales";
import { notification as Notification } from "antd";
export interface IFlowJson {
  startNode?: IWorkFlowNode;
}

export function useImport() {
  const edtorStore = useEditorEngine();
  const t = useTranslate();

  const doImport = useCallback(() => {
    getTheFiles(".json")
      .then(fileHandles => {
        fileHandles?.[0]?.getFile().then((file: any) => {
          file.text().then((fileData: any) => {
            try {
              const flowJson: IFlowJson = JSON.parse(fileData);
              if (flowJson.startNode) {
                edtorStore?.setStartNode(flowJson.startNode);
              } else {
                Notification.error({
                  message: "提醒",
                  description: t("fileIllegal")
                });
                // message.error(t("fileIllegal"));
              }
            } catch (error: any) {
              console.error(error);
              Notification.error({
                message: "提醒",
                description: t("fileIllegal")
              });
              // message.error(t("fileIllegal"));
            }
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, [edtorStore, t]);

  return doImport;
}
