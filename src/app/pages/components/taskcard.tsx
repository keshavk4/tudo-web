import Image from "next/image";
import { MouseEventHandler } from "react";

import EditIcon from "/public/assets/icons/edit-icon.svg";
import DeleteIcon from "/public/assets/icons/delete-icon.svg";

const TaskCard = (props: { task: string, onDelete: MouseEventHandler<HTMLSpanElement>, onEdit: MouseEventHandler<HTMLSpanElement> }) => {
    return (
        <section className="flex bg-blue-500 py-2 px-2 rounded-md">
            <span id="task" className="min-w-60 max-w-60 text-left text-gray-100 overflow-auto">{props.task}</span>
            <div className="flex w-max ml-auto">
                <span id="edit" className="pr-4" onClick={props.onEdit}>
                    <Image
                        src={EditIcon}
                        alt="Edit Icon"
                        height={24}
                        width={24}
                    />
                </span>
                <span id="delete" onClick={props.onDelete}>
                    <Image
                        src={DeleteIcon}
                        alt="Delete Icon"
                        height={24}
                        width={24}
                    />
                </span>
            </div>
        </section>
    );
}

export default TaskCard;