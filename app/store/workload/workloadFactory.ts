import { IDiseaseSelectorData } from '../../features/basic_report/components/DiseaseForm';
import { IScrollPickerItem } from '../../features/basic_report/types';
import { IWorkloadItem } from './models';
import { IRoadDefect, IWorkload } from './types';

export class WorkloadFactory {
  private _workload: IWorkload;
  public initial_data: IDiseaseSelectorData;

  constructor(data: IWorkload) {
    this._workload = data;

    const category = this.getDefaultCategory();
    const suboption = this.getDefaultSuboption(category);
    const inspection = this.getDefaultInspection(category, suboption);
    const damage = this.getDefaultDamage(category, suboption, inspection);
    const defect = this.getDefaultDefect(
      category,
      suboption,
      inspection,
      damage,
    );
    this.initial_data =  {
      category,
      suboption,
      inspection,
      damage,
      defect,
    };
  }

  

  public getDefaultCategory() {
    return this.getArrayFirstItemOrEmpty(this._workload.category);
  }

  public getCategory() {
    return this.getArrayOrEmpty(this._workload.category);
  }

  public getDefaultSuboption(category: string) {
    return this.getObjectFirstItemOrEmpty(
      this._workload.parent_category,
      category,
    );
  }

  public getsuboption(category: string) {
    return this.getObjectArrayOrEmpty(this._workload.parent_category, category);
  }

  public getDefaultInspection(category: string, suboption: string) {
    return this.getObjectFirstItemOrEmpty(
      this._workload.subname,
      `${category}-${suboption}`,
    );
  }

  public getInspection(category: string, suboption: string) {
    return this.getObjectArrayOrEmpty(
      this._workload.subname,
      `${category}-${suboption}`,
    );
  }

  public getDefaultDamage(
    category: string,
    suboption: string,
    inspection: string,
  ) {
    return this.getObjectFirstItemOrEmpty(
      this._workload.viewresult,
      `${category}-${suboption}-${inspection}`,
    );
  }

  public getDamage(category: string, suboption: string, inspection: string) {
    return this.getObjectArrayOrEmpty(
      this._workload.viewresult,
      `${category}-${suboption}-${inspection}`,
    );
  }

  public getDefaultDefect(
    category: string,
    suboption: string,
    inspection: string,
    damage: string,
  ) {
    return this.getDefectArrayOrEmpty(
      this._workload.dealwith,
      `${category}-${suboption}-${inspection}-${damage}`,
    );
  }

  private getObjectFirstItemOrEmpty = (
    col: Object | null | undefined,
    key: string,
  ): string => {
    let result = '';
    if (col && col.hasOwnProperty(key)) {
      const arr = col[key];
      if (arr && arr.length > 0) {
        result = arr[0];
      }
    }
    return result;
  };

  private getObjectArrayOrEmpty = (
    col: Object | null | undefined,
    key: string,
  ): IScrollPickerItem[] => {
    let result: IScrollPickerItem[] = [];
    if (col && col.hasOwnProperty(key)) {
      const arr = col[key];
      if (arr && arr.length > 0) {
        result = arr.map((item) => ({ label: item, value: item }));
      }
    }
    return result;
  };

  private getArrayFirstItemOrEmpty = (col: string[] | null | undefined) => {
    if (col && col.length > 0) {
      return col[0];
    }
    return '';
  };

  private getArrayOrEmpty = (
    col: string[] | null | undefined,
  ): IScrollPickerItem[] => {
    let result: IScrollPickerItem[] = [];
    if (col) {
      const arr = col;
      if (arr && arr.length > 0) {
        result = arr.map((item) => ({ label: item, value: item }));
      }
    }
    return result;
  };

  private getDefectArrayOrEmpty = (
    col: Object | null | undefined,
    key: string,
  ): IRoadDefect[] => {
    let result: IRoadDefect[] = [];
    if (col && col.hasOwnProperty(key)) {
      const arr = col[key];
      if (arr && arr.length > 0) {
        result = arr.map((item) => {
          //const str: string[] = item.split(",");
          const obj: IWorkloadItem = item;
          return {
            dealwithdesc: obj.DealWithDesc ? obj.DealWithDesc : '',
            unit: obj.MonitoringUnit ? obj.MonitoringUnit : '',
            amount: '0',
            length: '0',
            width: '0',
            depth: '0',
            standard: obj.RegistStandard ? obj.RegistStandard : '',
            associate: obj.AssociateUsersID ? obj.AssociateUsersID : '',
          };
        });
      }
    }
    return result;
  };
}
