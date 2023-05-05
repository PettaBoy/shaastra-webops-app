import { InputType, Field } from "type-graphql";

@InputType()
export class CreateNewTask {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    completed: boolean;
}

@InputType()
export class UpdateTask {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    completed?: boolean;
}