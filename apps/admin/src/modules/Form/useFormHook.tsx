import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {
  useCreateForm,
  useIntegratedAssociations,
  useIntegratedPropertyList
} from '@staff.ui/services';
import { stringSeparator } from '@staff.ui/utils';
import { useSnackBar } from '@staff.ui/shared-components';
import { useAppDispatch, useAppSelector } from '../../Hooks';
import {
  clearFormStateData,
  getCreateFormDetails,
  getFormDetail,
  getIntegratedAssociationList,
  getIntegratedList
} from '../../store';

export const useFormHook = () => {
  const { formData } = useAppSelector((state: any) => state.formData);
  const {
    styleAndPreview,
    setting,
    status,
    formType,
    formLogo,
    shareLinkCode,
    isCompleted,
    selectedPreview,
    preview,
    ...formDetails
  } = formData;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSuccessRef = useRef(false);
  const [successLoading, setSuccessLoading] = useState<boolean>(false);
  const [isCreateForm, setIsCreateForm] = useState<boolean>(false);
  const [isIntegrated, setIsIntegrated] = useState<boolean>(false);
  const { setSnackbarConfig } = useSnackBar();
  const handleOnchange = _.debounce((e: any) => {
    dispatch(getFormDetail({ data: { formName: e.target.value } }));
  }, 500);

  const handleFormCreateModal = () => {
    dispatch(clearFormStateData());
    setIsCreateForm(false);
  };

  const {
    mutate: CreateSaveDraftQuery,
    isLoading,
    error: saveError,
    isError: isSaveError
  } = useCreateForm({
    onSuccess: (data: any) => {
      const responseData = data.data.data || {};

      dispatch(getCreateFormDetails({ data: { formData: responseData } }));
      if (responseData.formType !== 'Basic') {
        setIsIntegrated(true);
        AssociationQuery();
      } else {
        router.push('/forms/create');
      }
    }
  });

  const handleCreateFormModal = () => {
    dispatch(clearFormStateData());
    setIsCreateForm(true);
  };

  const { data: associationList, refetch: AssociationQuery } =
    useIntegratedAssociations({
      objectName: formData.primaryObject,
      queryParams: {
        cacheTime: 0,
        onSuccess: (data: any) => {
          dispatch(
            getIntegratedAssociationList({ data: { association: data } })
          );
          setIsIntegrated(false);
        },
        select: (data: any) => {
          return [
            {
              label: stringSeparator(formData.primaryObject),
              value: formData.primaryObject
            },
            ...data.data.data.items.map((val) => {
              return { label: stringSeparator(val), value: val };
            })
          ];
        },
        enabled: isIntegrated
      }
    });

  const data = useIntegratedPropertyList({
    objectNames: associationList,
    queryParams: {
      cacheTime: 0,
      onSuccess: (data: any) => {
        dispatch(
          getIntegratedList({
            data: {
              integrated: {
                objectName: data.objectName,
                items: data.attributes.map((val) => {
                  return {
                    ...val,
                    id: val.label,
                    name: stringSeparator(val.label),

                    dataTypeValue: stringSeparator(val.label)
                  };
                })
              }
            }
          })
        );
      },
      select: (data: any) => data.data.data,
      enabled: !!associationList
    }
  });

  useEffect(() => {
    if (
      data.length &&
      data.every((result) => result.isSuccess) &&
      !isSuccessRef.current
    ) {
      isSuccessRef.current = true;
      router.push('/forms/create');
    }
  }, [data]);

  const handleStartBuilding = () => {
    setSuccessLoading(true);
    CreateSaveDraftQuery({
      data: {
        formLogo,
        formType,
        config: { ...setting, style: styleAndPreview },
        ...formDetails
      }
    });
  };

  useEffect(() => {
    if (isSaveError) {
      setSuccessLoading(false);

      setSnackbarConfig({
        open: true,
        message: saveError?.response?.data
          ? saveError?.response?.data?.message
          : 'something went wrong!',
        severity: 'error'
      });
    }
  }, [isSaveError]);

  return {
    isCreateForm,
    dispatch,
    setIsCreateForm,
    formData,
    router,
    handleOnchange,
    handleFormCreateModal,
    handleCreateFormModal,
    handleStartBuilding,
    isLoading,
    successLoading,
    isSaveError
  };
};
