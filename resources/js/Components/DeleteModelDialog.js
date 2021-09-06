import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Dialog, Text } from 'bumbag';
import ValidationErrors from '@/Components/ValidationErrors';

export default function DeleteModelDialog({ routeName, title, model, modalProps }) {
  const {
    setData,
    processing,
    errors,
    delete: destroy,
  } = useForm({
    id: 0,
  });

  const submit = () => {
    destroy(route(routeName, { id: model.id }), {
      onSuccess: () => {
        modalProps.hide();
      },
    });
  };

  React.useEffect(() => {
    if (model) {
      setData({ id: model.id });
    }
  }, [model]);

  return (
    <Dialog.Modal
      showActionButtons
      actionButtonsProps={{
        submitProps: { isLoading: processing, palette: 'danger' },
        submitText: 'Sim, deletar',
        cancelText: 'Cancelar',
        onClickSubmit: submit,
      }}
      type='danger'
      title={title}
      {...modalProps}
    >
      Tem certeza que deseja deletar <Text use='strong'>{model && model.name}</Text>?
      <ValidationErrors errors={errors} />
    </Dialog.Modal>
  );
}
