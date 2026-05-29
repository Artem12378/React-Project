import { useState } from 'react';
import { Input, Button } from '@mui/material';

type AddTodoFormProps = {
    onAddTodo: (title: string, description: string) => Promise<void>;
    disabled?: boolean;
};

export const AddTodoForm = ({ onAddTodo, disabled = false }: AddTodoFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim()) return;
        setIsSubmitting(true);
        await onAddTodo(title.trim(), description);
        setTitle('');
        setDescription('');
        setIsSubmitting(false);
    };

    return (
        <>
            <Input
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={disabled || isSubmitting}
            />
            <Input
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled || isSubmitting}
            />
            <Button disabled={!title || disabled || isSubmitting} onClick={handleSubmit}>
                Add
            </Button>
        </>
    );
};