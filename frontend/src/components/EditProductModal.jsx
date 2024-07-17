import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditProductModal({ setProducts, product }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: product.name,
		category: product.category,
		description: product.description,
		quantity: product.quantity,
		price: product.price,
	});
	const toast = useToast();

	const handleEditProduct = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/products/" + product.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setProducts((prevProducts) => prevProducts.map((p) => (p.id === product.id ? data : p)));
			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Product updated successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
				position: "top-center",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='Edit product'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleEditProduct}>
					<ModalContent>
						<ModalHeader>Edit Product 🛒</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								<FormControl>
									<FormLabel>Product Name</FormLabel>
									<Input
										placeholder='Product Name'
										value={inputs.name}
										onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Category</FormLabel>
									<Input
										placeholder='Category'
										value={inputs.category}
										onChange={(e) => setInputs((prev) => ({ ...prev, category: e.target.value }))}
									/>
								</FormControl>
							</Flex>

							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="Description of the product."
									value={inputs.description}
									onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
								/>
							</FormControl>

							<Flex alignItems={"center"} gap={4} mt={4}>
								<FormControl>
									<FormLabel>Quantity</FormLabel>
									<Input
										type='number'
										placeholder='Quantity'
										value={inputs.quantity}
										onChange={(e) => setInputs((prev) => ({ ...prev, quantity: e.target.value }))}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Price</FormLabel>
									<Input
										type='number'
										step='0.01'
										placeholder='Price'
										value={inputs.price}
										onChange={(e) => setInputs((prev) => ({ ...prev, price: e.target.value }))}
									/>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

export default EditProductModal;
