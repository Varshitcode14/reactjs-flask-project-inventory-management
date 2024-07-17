import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateProductModal = ({ setProducts }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		category: "",
		description: "",
		quantity: "",
		price: "",
	});
	const toast = useToast();

	const handleCreateProduct = async (e) => {
		e.preventDefault(); // prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Product created successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
			setProducts((prevProducts) => [...prevProducts, data]);

			setInputs({
				name: "",
				category: "",
				description: "",
				quantity: "",
				price: "",
			}); // clear inputs
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button onClick={onOpen}>
				<BiAddToQueue size={20} />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleCreateProduct}>
					<ModalContent>
						<ModalHeader> New Product 🛒 </ModalHeader>
						<ModalCloseButton />

						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								{/* Left */}
								<FormControl>
									<FormLabel>Product Name</FormLabel>
									<Input
										placeholder='Product Name'
										value={inputs.name}
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
									/>
								</FormControl>

								{/* Right */}
								<FormControl>
									<FormLabel>Category</FormLabel>
									<Input
										placeholder='Category'
										value={inputs.category}
										onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
									/>
								</FormControl>
							</Flex>

							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Input
									resize={"none"}
									overflowY={"hidden"}
									placeholder="Description of the product."
									value={inputs.description}
									onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
								/>
							</FormControl>

							<Flex alignItems={"center"} gap={4} mt={4}>
								<FormControl>
									<FormLabel>Quantity</FormLabel>
									<Input
										type='number'
										placeholder='Quantity'
										value={inputs.quantity}
										onChange={(e) => setInputs({ ...inputs, quantity: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Price</FormLabel>
									<Input
										type='number'
										step='0.01'
										placeholder='Price'
										value={inputs.price}
										onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
									/>
								</FormControl>
							</Flex>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Add
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};

export default CreateProductModal;
